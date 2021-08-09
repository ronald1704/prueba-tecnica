import {MigrationInterface, QueryRunner} from "typeorm";

export class creacionTablasV31628440439975 implements MigrationInterface {
    name = 'creacionTablasV31628440439975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`usuarios\` CHANGE \`contraseña\` \`contrasenia\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`usuarios\` DROP COLUMN \`contrasenia\``);
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`usuarios\` ADD \`contrasenia\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`usuarios\` DROP COLUMN \`contrasenia\``);
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`usuarios\` ADD \`contrasenia\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`usuarios\` CHANGE \`contrasenia\` \`contraseña\` varchar(255) NOT NULL`);
    }

}
