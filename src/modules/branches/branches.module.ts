import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Branch, BranchSchema } from './schema'
import { BranchesService } from './branches.service'
import { BranchesController } from './branches.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Branch.name, schema: BranchSchema }]),
  ],
  providers: [BranchesService],
  exports: [BranchesService],
  controllers: [BranchesController],
})
export class BranchesModule {}
