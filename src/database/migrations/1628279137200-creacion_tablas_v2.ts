import {MigrationInterface, QueryRunner} from "typeorm";

export class creacionTablasV21628279137200 implements MigrationInterface {
    name = 'creacionTablasV21628279137200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tallervehiculos\`.\`usuario_roles\` (\`usuariosIdUsuario\` int NOT NULL, \`rolesIdRrol\` int NOT NULL, INDEX \`IDX_e9b31429f4708e3dc5d7165a86\` (\`usuariosIdUsuario\`), INDEX \`IDX_15e51e47fdc8b562e75418b95b\` (\`rolesIdRrol\`), PRIMARY KEY (\`usuariosIdUsuario\`, \`rolesIdRrol\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`usuario_roles\` ADD CONSTRAINT \`FK_e9b31429f4708e3dc5d7165a86b\` FOREIGN KEY (\`usuariosIdUsuario\`) REFERENCES \`tallervehiculos\`.\`usuarios\`(\`idUsuario\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`usuario_roles\` ADD CONSTRAINT \`FK_15e51e47fdc8b562e75418b95b6\` FOREIGN KEY (\`rolesIdRrol\`) REFERENCES \`tallervehiculos\`.\`roles\`(\`idRrol\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`usuario_roles\` DROP FOREIGN KEY \`FK_15e51e47fdc8b562e75418b95b6\``);
        await queryRunner.query(`ALTER TABLE \`tallervehiculos\`.\`usuario_roles\` DROP FOREIGN KEY \`FK_e9b31429f4708e3dc5d7165a86b\``);
        await queryRunner.query(`DROP INDEX \`IDX_15e51e47fdc8b562e75418b95b\` ON \`tallervehiculos\`.\`usuario_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_e9b31429f4708e3dc5d7165a86\` ON \`tallervehiculos\`.\`usuario_roles\``);
        await queryRunner.query(`DROP TABLE \`tallervehiculos\`.\`usuario_roles\``);
    }

}
