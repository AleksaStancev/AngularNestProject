import { IsAlpha, IsDefined, IsNotEmpty } from 'class-validator';

export class CreateBucketlistTripDto {
  @IsDefined()
  @IsNotEmpty()
  readonly tripName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsAlpha()
  readonly destinationCountry: string;

  @IsDefined()
  @IsNotEmpty()
  readonly destinationInCountry: string;

  readonly bucketlistNotes: string;
}
