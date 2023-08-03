# Notes REST Service

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![Node.js](https://img.shields.io/badge/Node.js-272727?logo=nodedotjs&logoColor=339933)
![Nest.js](https://img.shields.io/badge/Nest.js-101010?logo=nestjs&logoColor=E0234E)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)

REST API for a notes app where users can create, edit, archive and delete their notes.

## API reference

| Endpoint            | Description                               |
| :------------------ | :---------------------------------------- |
| `GET /categories`   | Get all categories                        |
| `GET /notes/stats`  | Get categories with aggregated statistics |
| `GET /notes`        | Get all notes                             |
| `GET /notes/:id`    | Get single note                           |
| `POST /notes`       | Create note                               |
| `PATCH /notes/:id`  | Edit note                                 |
| `DELETE /notes/:id` | Delete note                               |

## Run server locally

You must have [Node.js](https://nodejs.org/en/download/) installed on your computer.

### 1. Clone the repository

```sh
# by SSH
git clone git@github.com:sashua/radency-notes-back.git

# or HTTPS
git clone https://github.com/sashua/radency-notes-back.git
```

### 2. Go to the project directory and install the dependencies

```sh
cd radency-notes-back
npm install
```

### 3. Start the server

```sh
npm run start
```

By default, the server starts listening on port `3000`, you can configure your own port by setting the value `SERVER_PORT` in the `.env` file.

## Notes

```ts
interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Statistics extends Category {
  active: number;
  archived: number;
}

interface Note {
  id: string;
  categoryId: string;
  name: string;
  content?: string;
  archived?: string;
  createdAt: string;
}

type CreateNoteDto = Pick<Note, 'categoryId' | 'name' | 'content'>;
type UpdateNoteDto = Partial<Omit<Note, 'id' | 'createdAt'>>;
```
