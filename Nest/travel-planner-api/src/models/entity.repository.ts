import {
  AnyKeys,
  AnyObject,
  Document,
  FilterQuery,
  Model,
  UpdateQuery,
} from 'mongoose';

export abstract class EntityRepository<Entity extends Document> {
  constructor(protected readonly entityModel: Model<Entity>) {}

  async findOne(
    entityFilterQuery: FilterQuery<Entity>,
    projection?: Record<string, unknown>,
  ): Promise<Entity | null> {
    return this.entityModel
      .findOne(entityFilterQuery, { ...projection })
      .exec();
  }

  async find(entityFilterQuery: FilterQuery<Entity>): Promise<Entity[] | null> {
    return this.entityModel.find(entityFilterQuery).exec();
  }

  async create(createEntityData: AnyKeys<Entity> & AnyObject): Promise<Entity> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findAndUpdateOne(
    entityFilterQuery: FilterQuery<Entity>,
    updateEntitQuery: UpdateQuery<Entity>,
  ): Promise<Entity | null> {
    return this.entityModel
      .findOneAndUpdate(entityFilterQuery, updateEntitQuery, { new: true })
      .exec();
  }

  async deleteOne(entityFilterQuery: FilterQuery<Entity>): Promise<boolean> {
    return (
      (await this.entityModel.deleteOne(entityFilterQuery).exec())
        .deletedCount === 1
    );
  }

  async deleteMany(entityFilterQuery: FilterQuery<Entity>): Promise<boolean> {
    return (
      (await this.entityModel.deleteMany(entityFilterQuery).exec())
        .deletedCount >= 1
    );
  }
}
