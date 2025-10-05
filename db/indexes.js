db = db.getSiblingDB('taskmanager');

//users collection indexes
db.users.createIndex(
  { email: 1 },
  {
    unique: true,
    name: 'idx_users_email'
  }
);

db.users.createIndex(
  { createdAt: -1 },
  {
    name: 'idx_users_created_at'
  }
);

//tasks collection indexes
db.tasks.createIndex(
  { userId: 1, createdAt: -1 },
  {
    name: 'idx_tasks_user_created'
  }
);

db.tasks.createIndex(
  { userId: 1, status: 1, createdAt: -1 },
  {
    name: 'idx_tasks_user_status_created'
  }
);

db.tasks.createIndex(
  { userId: 1, priority: 1, createdAt: -1 },
  {
    name: 'idx_tasks_user_priority_created'
  }
);

db.tasks.createIndex(
  { userId: 1, updatedAt: -1 },
  {
    name: 'idx_tasks_user_updated'
  }
);

db.tasks.createIndex(
  { title: 'text', description: 'text' },
  {
    name: 'idx_tasks_text_search',
    weights: {
      title: 10,
      description: 5
    }
  }
);

db.tasks.createIndex(
  { userId: 1, status: 1, priority: 1, createdAt: -1 },
  {
    name: 'idx_tasks_user_status_priority_created'
  }
);

// Index analysis
print('\n=== USERS COLLECTION INDEXES ===');
printjson(db.users.getIndexes());

print('\n=== TASKS COLLECTION INDEXES ===');
printjson(db.tasks.getIndexes());

print('\n=== INDEX CREATION COMPLETE ===');