# CI/CD Configuration & GitHub Actions

## 📋 Setup GitHub Actions Workflow

File: `.github/workflows/test.yml`

Workflow ini akan **automatically** berjalan setiap kali:
- Push ke branch `main` atau `develop`
- Membuat Pull Request ke branch `main` atau `develop`

## 🔄 Workflow Steps

### 1. Checkout Code
Mengambil kode dari repository

### 2. Setup Node.js
Setup Node.js dengan versi matrix (18.x dan 20.x) untuk testing compatibility

### 3. Install Dependencies
```bash
npm ci  # Clean install (recommended untuk CI environments)
```

### 4. Run ESLint
```bash
npm run lint
```
Memverifikasi code quality dengan ESLint

### 5. Run Tests with Coverage
```bash
npm run test:coverage
```
Menjalankan semua tests (unit + integration) dan generate coverage report

### 6. Upload Coverage to Codecov
Mengupload coverage report ke **Codecov.io** untuk tracking history

### 7. Archive Test Results
Menyimpan test results sebagai artifacts selama 30 hari

### 8. Comment On PR
Automatically comment pada Pull Request dengan coverage metrics

---

## 🚀 Local Testing with Coverage

Jalankan di local machine Anda:

### 1. Install Dependencies (first time only)
```bash
npm install -D @vitest/coverage-v8
```

### 2. Run Tests with Coverage Report
```bash
npm run test:coverage
```

Output akan dihasilkan di folder `coverage/`:
```
coverage/
├── index.html              # Browser view
├── coverage-summary.json   # JSON summary
├── coverage-final.json     # Codecov format
└── lcov.info              # LCOV format
```

### 3. View Coverage Report in Browser
```bash
# Windows
start coverage/index.html

# macOS
open coverage/index.html

# Linux
xdg-open coverage/index.html
```

---

## 📊 Coverage Thresholds

File: `vitest.config.js`

Konfigurasi minimum coverage yang harus dicapai:
```javascript
coverage: {
  lines: 80,        // 80% coverage untuk lines
  functions: 80,    // 80% coverage untuk functions
  branches: 80,     // 80% coverage untuk branches
  statements: 80,   // 80% coverage untuk statements
}
```

Workflow akan **FAIL** jika coverage di bawah threshold ini.

---

## 🔗 Integration dengan Codecov

### 1. Connect Codecov ke GitHub
1. Buka https://codecov.io
2. Sign in dengan GitHub account
3. Authorize Codecov
4. Select repository
5. Codecov token auto-generated (tidak perlu manual)

### 2. Coverage Badge
Tambahkan ke README.md:
```markdown
[![codecov](https://codecov.io/gh/YOUR_USERNAME/ci-cd/branch/main/graph/badge.svg?token=YOUR_TOKEN)](https://codecov.io/gh/YOUR_USERNAME/ci-cd)
```

### 3. View Coverage Reports
Lihat di: `https://codecov.io/gh/YOUR_USERNAME/ci-cd`

---

## 🎯 Test Coverage untuk Project

### Current Metrics (Expected)
Berdasarkan test cases yang ada:

| Component | Lines | Functions | Branches | Statements |
|-----------|-------|-----------|----------|-----------|
| increment() | 100% | 100% | 100% | 100% |
| decrement() | 100% | 100% | 100% | 100% |
| reset() | 100% | 100% | 100% | 100% |
| formatCurrency() | 100% | 100% | 100% | 100% |
| isValidEmail() | 100% | 100% | 100% | 100% |
| **TOTAL** | **100%** | **100%** | **100%** | **100%** |

---

## 📝 GitHub Actions Status Checks

PR akan memiliki status checks:

✅ **Passed**
- All tests passed
- Coverage above threshold
- Linting passed

❌ **Failed**
- Test failures
- Coverage below 80%
- Linting errors

---

## 🔐 Protected Branch Rules (Optional)

Untuk enforce quality standards:

1. Go to Repository Settings → Branches
2. Add Branch Protection Rule for `main`
3. Require status checks to pass:
   - ✓ `test (18.x)`
   - ✓ `test (20.x)`
   - ✓ ESLint
4. Require PR reviews before merge

---

## 📦 Files Added/Modified

### New Files:
- `.github/workflows/test.yml` - GitHub Actions workflow
- `vitest.config.js` - Updated dengan coverage config
- `package.json` - Updated dengan coverage dependency

### Coverage Output:
- `coverage/` - Generated after running `npm run test:coverage`

---

## 🎬 Quick Start

### Local Testing:
```bash
# Install
npm install

# Run tests
npm test

# Run with coverage
npm run test:coverage

# View coverage report
start coverage/index.html  # Windows
```

### Push to GitHub:
```bash
git add .
git commit -m "Add unit & integration tests with CI/CD"
git push origin main
```

GitHub Actions akan automatically trigger dan run tests!

---

## 📚 References

- **GitHub Actions**: https://docs.github.com/en/actions
- **Vitest Coverage**: https://vitest.dev/guide/coverage.html
- **Codecov Integration**: https://codecov.io/resources
- **Workflow Syntax**: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions
