import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInitialTables1732287195641 implements MigrationInterface {
  name = 'CreateInitialTables1732287195641';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "drink" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, "unit_price" numeric NOT NULL, "has_sugar" boolean NOT NULL, CONSTRAINT "UQ_c6def96c13961c406168434e4a0" UNIQUE ("code"), CONSTRAINT "PK_d2bcca4059e927221cce0f95756" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_drink" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "orderId" integer, "drinkId" integer, CONSTRAINT "PK_72bdccef2095a106ca85ac1361c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, "unit_price" numeric NOT NULL, "is_additional" boolean NOT NULL, CONSTRAINT "UQ_a128deb30979b06c8bba38cccd4" UNIQUE ("code"), CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_additional" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "orderId" integer, "ingredientId" integer, CONSTRAINT "PK_fbd43cf4fbf4838303cc171bb5d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "burger-ingredient" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "burgerId" integer, "ingredientId" integer, CONSTRAINT "PK_1c4dcf3c0b3a82caafbe9b7dbbd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "burger" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, "value" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a91f1f81fc5625a63c31ad3562e" UNIQUE ("code"), CONSTRAINT "PK_80c737e94dfc6a7cecd5a3a2a43" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order-burger" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "orderId" integer, "burgerId" integer, CONSTRAINT "PK_1f33d121aa3528a67f75ca2161e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "description" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "address" jsonb NOT NULL, "notes" text array NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_729b3eea7ce540930dbb7069498" UNIQUE ("code"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_drink" ADD CONSTRAINT "FK_9097736f4a46d15355a36422b85" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_drink" ADD CONSTRAINT "FK_82453f2fc4a1a0d22a10f355110" FOREIGN KEY ("drinkId") REFERENCES "drink"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_additional" ADD CONSTRAINT "FK_65ebed2596a66f57dfe942d8a4f" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_additional" ADD CONSTRAINT "FK_45531fd1ac51b9dc64533541ebd" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "burger-ingredient" ADD CONSTRAINT "FK_4d225d9a526c1f617a5b043a49b" FOREIGN KEY ("burgerId") REFERENCES "burger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "burger-ingredient" ADD CONSTRAINT "FK_9d8231f876384ce5990275ac8ac" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-burger" ADD CONSTRAINT "FK_3d097c3c8fefdfb6ccc2517cfd9" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-burger" ADD CONSTRAINT "FK_5aeaec1a322eac09f9fc6a50552" FOREIGN KEY ("burgerId") REFERENCES "burger"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order-burger" DROP CONSTRAINT "FK_5aeaec1a322eac09f9fc6a50552"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order-burger" DROP CONSTRAINT "FK_3d097c3c8fefdfb6ccc2517cfd9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "burger-ingredient" DROP CONSTRAINT "FK_9d8231f876384ce5990275ac8ac"`,
    );
    await queryRunner.query(
      `ALTER TABLE "burger-ingredient" DROP CONSTRAINT "FK_4d225d9a526c1f617a5b043a49b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_additional" DROP CONSTRAINT "FK_45531fd1ac51b9dc64533541ebd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_additional" DROP CONSTRAINT "FK_65ebed2596a66f57dfe942d8a4f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_drink" DROP CONSTRAINT "FK_82453f2fc4a1a0d22a10f355110"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_drink" DROP CONSTRAINT "FK_9097736f4a46d15355a36422b85"`,
    );
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "order-burger"`);
    await queryRunner.query(`DROP TABLE "burger"`);
    await queryRunner.query(`DROP TABLE "burger-ingredient"`);
    await queryRunner.query(`DROP TABLE "order_additional"`);
    await queryRunner.query(`DROP TABLE "ingredient"`);
    await queryRunner.query(`DROP TABLE "order_drink"`);
    await queryRunner.query(`DROP TABLE "drink"`);
  }
}
