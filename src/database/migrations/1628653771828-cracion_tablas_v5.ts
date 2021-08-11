import {MigrationInterface, QueryRunner} from "typeorm";

export class cracionTablasV51628653771828 implements MigrationInterface {
    name = 'cracionTablasV51628653771828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`vehiculos\` ADD \`status\` varchar(8) NOT NULL DEFAULT 'ACTIVO'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`vehiculos\` DROP COLUMN \`status\``);
    }

}
