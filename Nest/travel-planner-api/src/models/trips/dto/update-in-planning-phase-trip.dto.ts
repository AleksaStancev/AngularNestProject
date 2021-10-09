import { ChecklistSection } from 'src/models/submodels/checklist-section.submodel';
import { Vehicle } from 'src/models/submodels/vehicle.submodel';

export class UpdateInPlanningPhaseTripDto {
  readonly tripLengthInDays: number;
  readonly plannedDepartureDate: Date;
  readonly neededDocuments: ChecklistSection[];
  readonly packingList: ChecklistSection[];
  readonly tripActivities: ChecklistSection[];
  readonly planningNotes: string;
  readonly tripBudget: number;
  readonly vehicles: Vehicle[];
}
