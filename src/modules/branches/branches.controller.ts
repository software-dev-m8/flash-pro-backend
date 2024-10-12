import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { BranchesService } from './branches.service'
import { CreateBranchDto, UpdateBranchDto } from './dto'

@ApiTags('Branches')
@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post()
  createBranch(@Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.createBranch(createBranchDto)
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.branchesService.findBranchById(id)
  }

  @Patch(':id')
  updateBranch(
    @Param('id') id: string,
    @Body() updateBranchDto: UpdateBranchDto,
  ) {
    return this.branchesService.updateBranch(id, updateBranchDto)
  }

  @Delete(':id')
  deleteBranch(@Param('id') id: string) {
    return this.branchesService.deleteBranch(id)
  }
}
