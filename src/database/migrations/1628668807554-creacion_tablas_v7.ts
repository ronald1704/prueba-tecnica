import {MigrationInterface, QueryRunner} from "typeorm";

export class creacionTablasV71628668807554 implements MigrationInterface {
    name = 'creacionTablasV71628668807554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a9455f3a37d1d922a10f51664e\` ON \`tallervehiculos\`.\`vehiculos\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a9455f3a37d1d922a10f51664e\` ON \`tallervehiculos\`.\`vehiculos\` (\`placa\`)`);
    }

}
