# Technology Stack

This project uses the following technology stack:
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

# Development Workflow

1. Refer to user requirements and adjust the theme style in src/index.css and tailwind.config.ts
2. Based on user requirements, divide the pages that need to be implemented
3. Organize the functions that each page needs to implement, create corresponding folders under pages and their entry Index.tsx files
4. Create route configuration in App.tsx, importing the various entry files Index.tsx created earlier
5. Based on the requirements organized earlier, if the requirements are simple, you can complete all the work for that page directly in Index.tsx
6. If the requirements are complex, you can split the page into several components to implement, with the following directory structure:
    - Index.tsx entry point
    - /components/ components
    - /hooks/ hooks
    - /stores/ if there are complex interactive communications, you can use zustand for communication
7. After completing the requirements, you need to run pnpm i to install dependencies, and use npm run lint & npx tsc --noEmit -p tsconfig.app.json --strict for checking and fixing issues

# Backend API Integration
- When you need to add new APIs or operate supabase, you need to first add corresponding api files in src/api and export corresponding data types. You can refer to the src/demo.ts file. If it's supabase, you also need to implement it properly
- When implementing frontend with supabase, you need to implement completely according to data types, avoiding modifying the defined data types as much as possible. If modifications occur, you need to check all files that reference that type