import {MigrationInterface, QueryRunner} from "typeorm";

export class cracionTablasV41628648459850 implements MigrationInterface {
    name = 'cracionTablasV41628648459850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`roles\` ADD \`status\` varchar(8) NOT NULL DEFAULT 'ACTIVO'`);
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`roles\` DROP COLUMN \`rol\``);
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`roles\` ADD \`rol\` varchar(20) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`roles\` DROP COLUMN \`rol\``);
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`roles\` ADD \`rol\` varchar(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`roles\` DROP COLUMN \`status\``);
    }

}
