import {MigrationInterface, QueryRunner} from "typeorm";

export class creacionTablasV81628673473756 implements MigrationInterface {
    name = 'creacionTablasV81628673473756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`vehiculos\` DROP COLUMN \`modelo\``);
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`vehiculos\` ADD \`modelo\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`vehiculos\` DROP COLUMN \`modelo\``);
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`vehiculos\` ADD \`modelo\` varchar(4) NOT NULL`);
    }

}
