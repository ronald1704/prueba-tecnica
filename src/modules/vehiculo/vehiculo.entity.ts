import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("vehiculos")
export class Vehiculo extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "varchar", unique: true, length: 15, nullable: false })
    placa: string;

    @Column({ type: "varchar", length: 50, nullable: false, })
    marca: string;

    @Column({ type: "int", nullable: false, })
    modelo: number;

    @Column({ type: "varchar", length: 50, nullable: false, })
    color: string;

    @Column({ type: "varchar", length: 100, nullable: false, })
    detalle: string;

    @Column({ type: "varchar", length: 200, nullable: false, })
    imagen: string;

    @Column({ type: "float", nullable: false, })
    valor: number;

    @CreateDateColumn({ type: "timestamp", name: "creado_en" })
    fechaCreacion: Date;

    @UpdateDateColumn({ type: "timestamp", name: "actualizado_el" })
    fechaActualizacion: Date;
}