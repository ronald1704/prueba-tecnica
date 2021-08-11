import {MigrationInterface, QueryRunner} from "typeorm";

export class creacionTablasV91628673623546 implements MigrationInterface {
    name = 'creacionTablasV91628673623546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`vehiculos\` DROP COLUMN \`modelo\``);
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`vehiculos\` ADD \`modelo\` varchar(4) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`vehiculos\` DROP COLUMN \`modelo\``);
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`vehiculos\` ADD \`modelo\` int NOT NULL`);
    }

}
