# Product CRUD API

A concise RESTful service built with **NestJS**, **TypeORM**, and **PostgreSQL**, featuring full product management and image uploads to **Cloudinary**.

---

##  Tech Stack

- **Framework:** NestJS 12 (ES Modules)
- **Database & ORM:** PostgreSQL + TypeORM
- **Cloud Storage:** Cloudinary (via Multer memory storage)
- **Validation:** `class-validator`, `class-transformer`
- **Testing & Linting:** Vitest, Supertest, Oxlint

---

##  Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000

# PostgreSQL Database
DATABASE_HOST=DATABASE_HOST
DATABASE_PORT=DATABASE_PORT
DATABASE_USER_NAME=DATABASE_USER_NAME
DATABASE_PASSWORD=DATABASE_PASSWORD
DATABASE_NAME=DATABASE_NAME

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

##  Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Start in watch mode
pnpm run start:dev

# 3. Build & run for production
pnpm run build
pnpm run start:prod
```

---

##  Database Migrations

Database schema is version-controlled via TypeORM migrations located in `src/migrations/`.

```bash
# Run pending migrations
pnpm dlx typeorm-ts-node-esm migration:run -d src/database/data-source.ts

# Generate a migration based on entity changes
pnpm dlx typeorm-ts-node-esm migration:generate src/migrations/<MigrationName> -d src/database/data-source.ts

# Revert the latest migration
pnpm dlx typeorm-ts-node-esm migration:revert -d src/database/data-source.ts
```

---

##  API Reference

Base URL: `http://localhost:3000/api/product`

### Endpoints

| Method | Endpoint | Body Type | Description |
|---|---|---|---|
| **GET** | `/api/product` | None | Fetch all products (sorted newest first) |
| **POST** | `/api/product` | `multipart/form-data` | Create product with optional image upload |
| **PUT** | `/api/product/:id` | `multipart/form-data` | Update product details and/or replace image |
| **DELETE** | `/api/product/:id` | None | Delete product and its Cloudinary image |

### Data Model (`Product`)

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `number` | Auto | Primary key |
| `productName` | `string` | Yes | Product name (min length 3) |
| `unitPrice` | `number` | Yes | Price per unit ($\ge$ 0) |
| `stockQty` | `number` | Yes | In-stock quantity ($\ge$ 0) |
| `description` | `string` | No | Optional product details |
| `imageUrl` | `string` | Auto | Cloudinary secure URL |
| `imagePublicId` | `string` | Auto | Cloudinary asset identifier |
| `file` | `binary` | No | Image file (JPG/PNG/WEBP, $\le$ 5 MB) |

---

##  Testing & Linting

```bash
# Run unit tests
pnpm test

# Run e2e tests
pnpm test:e2e

# Lint codebase
pnpm run lint
```
