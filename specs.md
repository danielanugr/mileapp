For this assignment, you will be asked to:
Build a Login page and a Task CRUD module (Create, Read, Update, Delete).
Requirements:

1. Mock API
   - Use a mock API (no real database).
   - Endpoints:
     - POST /login (return mock token).
     - GET /tasks (must support filter, sort, pagination, and return meta info).
     - POST /tasks, PUT /tasks/:id, DELETE /tasks/:id.
   - Responses should mimic real APIs (status codes, error handling).
2. Frontend
   - Use Vue.js.
   - Login page with mock auth flow (token-based).
   - Task module with full CRUD and protected routes.
   - Clean and responsive UI/UX.
3. MongoDB Index Script

   - Provide a file db/indexes.js with MongoDB index creation commands based on
     your query needs.

4. Deployment
   - Deploy both frontend and mock API (e.g., Vercel, Netlify, Render, Railway).
   - Share live URLs and repository Code link.
5. readme.md
   - Explain what you built, your design decisions, and the strengths of your module.
   - Include why you chose the database indexes you created.
