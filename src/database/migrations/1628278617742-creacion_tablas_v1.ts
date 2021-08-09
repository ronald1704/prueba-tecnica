import {MigrationInterface, QueryRunner} from "typeorm";

export class creacionTablasV11628278617742 implements MigrationInterface {
    name = 'creacionTablasV11628278617742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tallervehiculos\`.\`usuarios\` (\`idUsuario\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(50) NOT NULL, \`apellido\` varchar(50) NOT NULL, \`telefono\` varchar(10) NOT NULL, \`correo\` varchar(50) NOT NULL, \`status\` varchar(8) NOT NULL DEFAULT 'ACTIVO', \`contraseña\` varchar(255) NOT NULL, \`creado_en\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`actualizado_el\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`idUsuario\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tallervehiculos\`.\`roles\` (\`idRrol\` int NOT NULL AUTO_INCREMENT, \`rol\` varchar(30) NOT NULL, PRIMARY KEY (\`idRrol\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tallervehiculos\`.\`vehiculos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`placa\` varchar(15) NOT NULL, \`marca\` varchar(50) NOT NULL, \`modelo\` int NOT NULL, \`color\` varchar(50) NOT NULL, \`detalle\` varchar(100) NOT NULL, \`imagen\` varchar(200) NOT NULL, \`valor\` float NOT NULL, \`creado_en\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`actualizado_el\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_a9455f3a37d1d922a10f51664e\` (\`placa\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a9455f3a37d1d922a10f51664e\` ON \`tallervehiculos\`.\`vehiculos\``);
        await queryRunner.query(`DROP TABLE \`tallervehiculos\`.\`vehiculos\``);
        await queryRunner.query(`DROP TABLE \`tallervehiculos\`.\`roles\``);
        await queryRunner.query(`DROP TABLE \`tallervehiculos\`.\`usuarios\``);
    }

}
