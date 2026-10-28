# 烏魚子計算機

依價目表計算每片烏魚子的等級與金額：<https://yang-hong-xin.com/mullet>

1. 在「價目表」輸入每個等級的重量範圍（兩）與價格（元/斤）。範圍包含最小值、不包含最大值，範圍重疊時以後面的列為準。
2. 在「烏魚子」輸入每片的重量（兩），自動查出等級並計算金額（價格 × 重量 ÷ 16），最後一列是總計。
3. 改價目表時，已輸入的烏魚子會跟著重新計算。

## Development

需要 Node.js 22 以上。

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm test
npm run build
```

push 到 `main` 後，GitHub Actions 會跑型別檢查與測試，再 build 並部署到 `gh-pages`。

Built with [Vue 3](https://vuejs.org), [TypeScript](https://www.typescriptlang.org), [Vite](https://vite.dev), [Bootstrap 5](https://getbootstrap.com) and [Vitest](https://vitest.dev).
