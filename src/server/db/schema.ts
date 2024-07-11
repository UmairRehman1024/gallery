// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  AnyPgColumn,
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `gallery_${name}`);

export const albums = createTable("albums", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  userId: varchar("userId", { length: 256 }).notNull(),
  parentId: integer("parent_id").references((): AnyPgColumn => albums.id), // Self-referencing foreign key for nested folders
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const images = createTable("images", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  url: varchar("url", { length: 1024 }).notNull(),
  userId: varchar("userId", { length: 256 }).notNull(),
  key: varchar("key", { length: 256 }).notNull(),
  albumId: integer("albumId").references(() => albums.id), // Foreign key to albums table
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});
