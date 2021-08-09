import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../usuario/usuario.entity";

@Entity("roles")
export class Rol extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    idRrol: number;

    @Column({ type: "varchar", length: 30, nullable: false })
    rol: string;

    @ManyToMany(type => Usuario, usuario => usuario.roles)
    @JoinColumn()
    usuarios: Usuario[];
}