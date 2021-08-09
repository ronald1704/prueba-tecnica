import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Rol } from "../rol/rol.entity";

@Entity("usuarios")
export class Usuario extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    idUsuario: number;

    @ManyToMany(type => Rol, rol => rol.usuarios, { eager: true })
    @JoinTable({ name: "usuario_roles" })
    roles: Rol[];

    @Column({ type: "varchar", length: 50, nullable: false })
    nombre: string;

    @Column({ type: "varchar", length: 50, nullable: false, })
    apellido: string;

    @Column({ type: "varchar", length: 10, nullable: false, })
    telefono: string;

    @Column({ type: "varchar", length: 50, nullable: false, })
    correo: string;

    @Column({ type: "varchar", default: "ACTIVO", length: 8 })
    status: string;

    @Column({ type: "varchar", nullable: false, })
    contrasenia: string;

    @CreateDateColumn({ type: "timestamp", name: "creado_en" })
    fechaCreacion: Date;

    @UpdateDateColumn({ type: "timestamp", name: "actualizado_el" })
    fechaActualizacion: Date;
}