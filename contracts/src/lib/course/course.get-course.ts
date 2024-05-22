import { IsString } from 'class-validator';
import { ICourse, IUser } from '@jiraf/interfaces';

export namespace CourseGetCourse {
  export const topic = 'course.get-course.query';

  export class Request {
    @IsString()
    id: string;

  }

  export class Response {
    course: ICourse;
  }
}
