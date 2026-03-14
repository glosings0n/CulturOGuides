const SHEET_NAME = 'Scores';
const ATTEMPTS_SHEET_NAME = 'Attempts';
const WINDOW_MS = 60 * 60 * 1000;
const MAX_ATTEMPTS = 2;

function doPost(e) {
  try {
    return json_(upsert_(JSON.parse((e.postData && e.postData.contents) || '{}')));
  } catch (error) {
    return json_({ ok: false, error: error.message });
  }
}

function doGet(e) {
  try {
    const p = (e && e.parameter) || {};
    const action = (p.action || 'leaderboard').toLowerCase();

    if (action === 'user') return json_({ ok: true, user: user_(p.username) });
    if (action === 'attempt') return json_(attempt_(p.username));
    if (action === 'upsert') return json_(upsert_(p));
    return json_(leaderboard_());
  } catch (error) {
    return json_({ ok: false, error: error.message });
  }
}

function upsert_(data) {
  const sheet = sheet_(SHEET_NAME, ['Username', 'Country', 'Emoji', 'Avatar', 'Score']);
  const values = sheet.getDataRange().getValues();
  const username = clean_(data.username);
  const row = [
    username,
    String(data.country || ''),
    String(data.emoji || ''),
    String(data.avatar || ''),
    parseInt(data.score, 10) || 0
  ];

  if (!username) throw new Error('Username is required');

  for (let i = 1; i < values.length; i += 1) {
    if (norm_(values[i][0]) === norm_(username)) {
      sheet.getRange(i + 1, 1, 1, 5).setValues([row]);
      return { ok: true, status: 'success', updated: true, created: false };
    }
  }

  sheet.appendRow(row);
  return { ok: true, status: 'success', updated: false, created: true };
}

function leaderboard_() {
  const values = sheet_(SHEET_NAME, ['Username', 'Country', 'Emoji', 'Avatar', 'Score']).getDataRange().getValues();
  const list = [];

  for (let i = 1; i < values.length; i += 1) {
    if (values[i][0]) {
      list.push({
        username: values[i][0],
        country: values[i][1],
        emoji: values[i][2],
        avatar: values[i][3],
        score: parseInt(values[i][4], 10) || 0
      });
    }
  }

  return list.sort((a, b) => b.score - a.score);
}

function user_(username) {
  const target = norm_(username);
  const list = leaderboard_();
  for (let i = 0; i < list.length; i += 1) {
    if (norm_(list[i].username) === target) return list[i];
  }
  return null;
}

function attempt_(username) {
  const name = clean_(username);
  const sheet = sheet_(ATTEMPTS_SHEET_NAME, ['Username', 'WindowStart', 'Attempts', 'UpdatedAt']);
  const values = sheet.getDataRange().getValues();
  const now = Date.now();
  let rowIndex = -1;
  let start = now;
  let attempts = 0;

  if (!name) throw new Error('Username is required');

  for (let i = 1; i < values.length; i += 1) {
    if (norm_(values[i][0]) === norm_(name)) {
      rowIndex = i + 1;
      start = Number(values[i][1]) || now;
      attempts = Number(values[i][2]) || 0;
      break;
    }
  }

  if (now - start >= WINDOW_MS) {
    start = now;
    attempts = 0;
  }

  const allowed = attempts < MAX_ATTEMPTS;
  if (allowed) attempts += 1;
  writeAttempt_(sheet, rowIndex, [name, start, attempts, now]);

  return {
    ok: true,
    allowed,
    attemptsUsed: attempts,
    remaining: Math.max(0, MAX_ATTEMPTS - attempts),
    resetAt: start + WINDOW_MS
  };
}

function writeAttempt_(sheet, rowIndex, row) {
  if (rowIndex === -1) return sheet.appendRow(row);
  sheet.getRange(rowIndex, 1, 1, 4).setValues([row]);
}

function sheet_(name, headers) {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(name);
  if (!sheet) sheet = book.insertSheet(name);
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);
  return sheet;
}

function clean_(value) {
  return String(value || '').trim().replace(/^@+/, '');
}

function norm_(value) {
  return clean_(value).toLowerCase();
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}