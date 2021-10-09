import { ChecklistSection } from 'src/models/submodels/checklist-section.submodel';

export class UpdateInProgressTripDto {
  readonly inProgressNotes: string;
  readonly tripActivities: ChecklistSection[];
}
