import { Max, Min } from 'class-validator';

export class UpdateUserSpreadDto {
  @Min(0)
  @Max(100)
  spread: number;
}
