import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { TripPhase } from 'src/common/enumerations/trip-phase.enumeration';
import { ChecklistSection } from 'src/models/submodels/checklist-section.submodel';
import { Vehicle } from 'src/models/submodels/vehicle.submodel';
import { User } from 'src/models/users/schema/user.schema';
import { ExcludeProperty } from 'nestjs-mongoose-exclude';

export type TripDocument = Trip & Document;

@Schema()
export class Trip {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  @ExcludeProperty()
  user: User;
  @Prop({ required: true })
  @ExcludeProperty()
  tripPhase: TripPhase;
  @Prop({ required: true })
  tripName: string;
  @Prop({ required: true })
  destinationCountry: string;
  @Prop({ required: true })
  destinationInCountry: string;
  @Prop()
  bucketlistNotes: string;
  @Prop()
  @ExcludeProperty()
  tripLengthInDays: number;
  @Prop()
  @ExcludeProperty()
  plannedDepartureDate: Date;
  @Prop({
    type: [
      {
        sectionName: String,
        checklist: [{ content: String, checked: Boolean }],
      },
    ],
  })
  @ExcludeProperty()
  neededDocuments: ChecklistSection[];
  @Prop({
    type: [
      {
        sectionName: String,
        checklist: [{ content: String, checked: Boolean }],
      },
    ],
  })
  @ExcludeProperty()
  packingList: ChecklistSection[];
  @Prop({
    type: [
      {
        sectionName: String,
        checklist: [{ content: String, checked: Boolean }],
      },
    ],
  })
  @ExcludeProperty()
  tripActivities: ChecklistSection[];
  @Prop()
  @ExcludeProperty()
  planningNotes: string;
  @Prop()
  @ExcludeProperty()
  inProgressNotes: string;
  @Prop()
  @ExcludeProperty()
  tripBudget: number;
  @ExcludeProperty()
  @Prop({ type: [{ name: String, price: Number }] })
  vehicles: Vehicle[];
  @ExcludeProperty()
  @Prop()
  transportPrice: number;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
