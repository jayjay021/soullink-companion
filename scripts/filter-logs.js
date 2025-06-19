#!/usr/bin/env node

// eslint-disable-next-line @typescript-eslint/no-require-imports
const readline = require('readline');

// 🎨 ANSI color codes for beautiful output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
};

// 🚫 Patterns to filter out (Next.js noise)
const filterPatterns = [
  /^\s*$/, // Empty lines
  /^- wait /, // Next.js wait messages
  /^- info /, // Next.js info messages
  /^- event /, // Next.js event messages
  /^- ready /, // Next.js ready messages
  /^\s*⚠/, // Warning symbols
  /^\s*ℹ/, // Info symbols
  /Fast Refresh/, // Fast Refresh messages
  /automatically enabled/, // Auto-enabled features
  /webpack compiled/, // Webpack compilation
  /ready - started server/, // Server ready messages
  /Local:\s+http:\/\/localhost/, // Local server URLs
  /Network:\s+use --host/, // Network messages
  /Attention: Next\.js/, // Next.js attention messages
  /experimental feature/i, // Experimental feature warnings
  /Type checking in progress/, // TypeScript checking
  /Found \d+ error\(s\)/, // TypeScript error counts
  /No errors found/, // TypeScript success
  /Automatically optimizing/, // Static optimization
  /First Load JS shared/, // Bundle analysis
  /└ chunks\/pages/, // Bundle tree
  /├ chunks\/framework/, // Bundle tree
  /├ chunks\/main/, // Bundle tree
];

// ✨ Important patterns that should be highlighted with style
const highlightPatterns = [
  {
    pattern: /error/i,
    color: colors.red + colors.bright,
    icon: '🚨',
    label: 'ERROR',
    bg: colors.bgRed,
  },
  {
    pattern: /failed/i,
    color: colors.red + colors.bright,
    icon: '❌',
    label: 'FAILED',
    bg: colors.bgRed,
  },
  {
    pattern: /warning/i,
    color: colors.yellow + colors.bright,
    icon: '⚠️ ',
    label: 'WARN',
    bg: colors.bgYellow,
  },
  {
    pattern: /(success|passed)/i,
    color: colors.green + colors.bright,
    icon: '✅',
    label: 'SUCCESS',
    bg: colors.bgGreen,
  },
  {
    pattern: /test.*pass/i,
    color: colors.green + colors.bright,
    icon: '🧪',
    label: 'TEST PASS',
    bg: colors.bgGreen,
  },
  {
    pattern: /test.*fail/i,
    color: colors.red + colors.bright,
    icon: '🧪',
    label: 'TEST FAIL',
    bg: colors.bgRed,
  },
  {
    pattern: /(server.*start|ready.*on)/i,
    color: colors.cyan + colors.bright,
    icon: '🚀',
    label: 'SERVER',
    bg: colors.bgBlue,
  },
  {
    pattern: /api.*route/i,
    color: colors.blue + colors.bright,
    icon: '🔗',
    label: 'API',
    bg: colors.bgBlue,
  },
  {
    pattern: /build/i,
    color: colors.magenta + colors.bright,
    icon: '🔨',
    label: 'BUILD',
    bg: colors.bgMagenta,
  },
  {
    pattern: /(compil|bundle)/i,
    color: colors.cyan + colors.bright,
    icon: '⚙️ ',
    label: 'COMPILE',
    bg: colors.bgBlue,
  },
];

// 🕒 Function to add beautiful timestamp
function getTimestamp() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return `${colors.gray}[${time}]${colors.reset}`;
}

// 🎨 Function to create a beautiful box for labels
function createLabelBox(icon, label, color, bg) {
  const padding = ' ';
  return `${bg}${colors.white}${colors.bright}${padding}${icon} ${label}${padding}${colors.reset}`;
}

// 🌈 Function to format and colorize output beautifully
function formatLine(line) {
  // Check if line should be filtered out
  for (const pattern of filterPatterns) {
    if (pattern.test(line)) {
      return null; // Filter out this line
    }
  }

  // 📋 Try to parse and format JSON lines
  if (line.trim().startsWith('{') && line.trim().endsWith('}')) {
    try {
      const jsonObj = JSON.parse(line);
      return formatJsonLine(jsonObj);
    } catch {
      // Not valid JSON, continue with regular formatting
    }
  }

  // Check for important patterns and highlight them beautifully
  for (const { pattern, color, icon, label, bg } of highlightPatterns) {
    if (pattern.test(line)) {
      const labelBox = createLabelBox(icon, label, color, bg);
      return `${getTimestamp()} ${labelBox} ${colors.white}${line}${colors.reset}`;
    }
  }

  // 📝 Default formatting for regular lines with subtle styling
  if (line.trim()) {
    return `${getTimestamp()} ${colors.dim}│${colors.reset} ${colors.white}${line}${colors.reset}`;
  }

  return null;
}

// 🎨 Function to format JSON log lines beautifully
function formatJsonLine(jsonObj) {
  const timestamp = getTimestamp();
  let output = `${timestamp} `;

  // 🏷️ Add level indicator with appropriate label and color
  const level = jsonObj.level || jsonObj.lvl || 'info';
  const levelIcon = getLevelIcon(level);

  output += `${levelIcon} `;

  // 📝 Add the main message
  const message = jsonObj.msg || jsonObj.message || '';
  if (message) {
    output += `${colors.white}${message}${colors.reset}`;
  }

  // 🔍 Add important fields with subtle formatting
  const importantFields = [];

  if (jsonObj.component) {
    importantFields.push(`${colors.cyan}[${jsonObj.component}]${colors.reset}`);
  }

  if (jsonObj.endpoint) {
    importantFields.push(`${colors.blue}${jsonObj.endpoint}${colors.reset}`);
  }

  if (jsonObj.duration) {
    importantFields.push(
      `${colors.yellow}⏱️ ${jsonObj.duration}${colors.reset}`
    );
  }

  if (jsonObj.status || jsonObj.statusCode) {
    const status = jsonObj.status || jsonObj.statusCode;
    const statusColor = getStatusColor(status);
    importantFields.push(`${statusColor}${status}${colors.reset}`);
  }

  if (jsonObj.method) {
    const methodColor = getMethodColor(jsonObj.method);
    importantFields.push(`${methodColor}${jsonObj.method}${colors.reset}`);
  }

  if (importantFields.length > 0) {
    output += ` ${colors.dim}│${colors.reset} ${importantFields.join(' ')}`;
  }

  // 🔢 Add any numeric fields
  const numericFields = [];
  ['resultCount', 'pokemonCount', 'playerCount', 'sessionCount'].forEach(
    (field) => {
      if (jsonObj[field] !== undefined) {
        numericFields.push(
          `${colors.green}${field}: ${jsonObj[field]}${colors.reset}`
        );
      }
    }
  );

  if (numericFields.length > 0) {
    output += ` ${colors.dim}│${colors.reset} ${numericFields.join(', ')}`;
  }

  // ⚠️ Add error details if present
  if (jsonObj.error && level === 'error') {
    output += `\n${colors.dim}    └─${colors.reset} ${colors.red}Error: ${jsonObj.error}${colors.reset}`;
    if (jsonObj.stack) {
      // Show first line of stack trace only
      const firstStackLine = jsonObj.stack.split('\n')[1];
      if (firstStackLine) {
        output += `\n${colors.dim}       ${firstStackLine.trim()}${colors.reset}`;
      }
    }
  }

  return output;
}

// 🎨 Get color for log level
function getLevelColor(level) {
  switch (level.toLowerCase()) {
    case 'error':
      return colors.red + colors.bright;
    case 'warn':
    case 'warning':
      return colors.yellow + colors.bright;
    case 'info':
      return colors.blue;
    case 'debug':
      return colors.gray;
    default:
      return colors.white;
  }
}

// 🎯 Get formatted level label with color
function getLevelIcon(level) {
  const levelColor = getLevelColor(level);
  return `${levelColor}[${level.toUpperCase()}]${colors.reset}`;
}

// 🌈 Get color for HTTP status codes
function getStatusColor(status) {
  const code = parseInt(status);
  if (code >= 200 && code < 300) return colors.green + colors.bright;
  if (code >= 300 && code < 400) return colors.cyan + colors.bright;
  if (code >= 400 && code < 500) return colors.yellow + colors.bright;
  if (code >= 500) return colors.red + colors.bright;
  return colors.white;
}

// 🌈 Get color for HTTP methods
function getMethodColor(method) {
  switch (method.toUpperCase()) {
    case 'GET':
      return colors.green;
    case 'POST':
      return colors.blue + colors.bright;
    case 'PUT':
      return colors.yellow + colors.bright;
    case 'DELETE':
      return colors.red;
    case 'PATCH':
      return colors.magenta;
    default:
      return colors.white;
  }
}

// 🎭 Beautiful header with ASCII art
function printHeader() {
  const headerColor = colors.cyan + colors.bright;
  const resetColor = colors.reset;

  console.log(
    `${headerColor}╭─────────────────────────────────────────────────────────────────────╮${resetColor}`
  );
  console.log(
    `${headerColor}│                      🎛️  ✨ LOG FILTER ACTIVE ✨                      │${resetColor}`
  );
  console.log(
    `${headerColor}│                  Filtering Next.js development noise                 │${resetColor}`
  );
  console.log(
    `${headerColor}│                     Making logs beautiful again!                    │${resetColor}`
  );
  console.log(
    `${headerColor}╰─────────────────────────────────────────────────────────────────────╯${resetColor}`
  );
  console.log();
}

// 📝 Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

// 🚀 Start with beautiful header
printHeader();

// 📝 Process each line with style
rl.on('line', (line) => {
  const formattedLine = formatLine(line);
  if (formattedLine !== null) {
    console.log(formattedLine);
  }
});

// 🎭 Beautiful footer when input ends
rl.on('close', () => {
  console.log();
  const footerColor = colors.cyan + colors.bright;
  const resetColor = colors.reset;

  console.log(
    `${footerColor}╭─────────────────────────────────────────────────────────────────────╮${resetColor}`
  );
  console.log(
    `${footerColor}│                    ✨ Log filtering completed ✨                     │${resetColor}`
  );
  console.log(
    `${footerColor}╰─────────────────────────────────────────────────────────────────────╯${resetColor}`
  );
});

// 🎯 Handle end of input with style
rl.on('close', () => {
  console.log();
  console.log(
    `${colors.gray}${colors.dim}╭─────────────────────────────────────────────────────────────────────╮${colors.reset}`
  );
  console.log(
    `${colors.gray}${colors.dim}│                    ✨ Log filtering completed ✨                     │${colors.reset}`
  );
  console.log(
    `${colors.gray}${colors.dim}╰─────────────────────────────────────────────────────────────────────╯${colors.reset}`
  );
  console.log();
});
