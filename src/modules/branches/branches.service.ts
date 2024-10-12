import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Branch } from './schema'
import { CreateBranchDto, UpdateBranchDto } from './dto'

@Injectable()
export class BranchesService {
  constructor(
    @InjectModel(Branch.name) private readonly branchModel: Model<Branch>,
  ) {}

  async createBranch(createBranchDto: CreateBranchDto): Promise<Branch> {
    return await this.branchModel.create(createBranchDto)
  }

  async findBranchById(id: string): Promise<Branch> {
    return await this.branchModel.findById(id)
  }

  async updateBranch(id: string, updateBranchDto: UpdateBranchDto) {
    const updatedBranch = await this.branchModel
      .findByIdAndUpdate(id, updateBranchDto)
      .exec()

    if (!updatedBranch) {
      throw new HttpException('BRANCH_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return updatedBranch
  }

  async deleteBranch(id: string): Promise<Branch> {
    const deletedBranch = await this.branchModel.findByIdAndDelete(id).exec()

    if (!deletedBranch) {
      throw new HttpException('BRANCH_NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    return deletedBranch
  }
}
