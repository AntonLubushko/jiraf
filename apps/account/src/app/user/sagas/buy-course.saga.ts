import { UserEntity } from '../entities/user.entity';
import { RMQService } from 'nestjs-rmq';
import { PurchaseState } from '@jiraf/interfaces';
import { BuyCourseSagaState } from './buy-course.state';

export class BuyCourseSaga {
  private state: BuyCourseSagaState;

  constructor(private user: UserEntity,private couseId: string, private rmqService: RMQService) {

  }

  setState(state: PurchaseState, courseId: string) {
    switch (state){
      case PurchaseState.Started:
        break;
      case PurchaseState.WaitingForPayment:
          break;
      case PurchaseState.Purchased:
        break;
      case PurchaseState.Canceled:
        break;
    }
    this.state.setContext(this);
    this.user.updateCourseStatus(courseId, state);
  }

  getState() {
    return this.state;
  }
}
