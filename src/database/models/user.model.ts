import { Model, Table, Column, PrimaryKey, AutoIncrement } from "sequelize-typescript";

@Table({
  tableName: 'users',
  timestamps: false
})

export class User extends Model {
  @PrimaryKey
  @AutoIncrement

  @Column
  id: number

  @Column
  login: string

  @Column
  name: string

  @Column
  password: string

  @Column
  permissions: 'ADMIN' | 'MANAGER' | 'USUARIO'
}