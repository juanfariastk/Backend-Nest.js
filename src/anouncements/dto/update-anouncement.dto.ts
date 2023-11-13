import { PartialType } from '@nestjs/swagger';
import { CreateAnouncementDto } from './create-anouncement.dto';

export class UpdateAnouncementDto extends PartialType(CreateAnouncementDto) {}
