import {Component, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {QuizServices} from '../../services/QuizServices';
import {ITest} from '../../../common/interfaces/QuizInterfaces';
import {TestCategoryFilter} from './TestCategoryFilter';

@Component({
    selector: 'user-test-list',
    templateUrl: './components/quiz/UserTestList.html',
    styleUrls: ['./components/quiz/UserTestList.css'],
    inputs: ['username', 'filterCategory'],
    outputs: ['selectedTest'],
    pipes: [TestCategoryFilter],
    providers: [QuizServices],
    directives: [CORE_DIRECTIVES]
})
export class UserTestList {

    username:string = '';
    userTests:ITest[] = [];
    filterCategory:string = null;

    selectedTest:EventEmitter<number> = new EventEmitter<number>();
    constructor(public quizServices:QuizServices) {
    }

    ngOnInit() {

        console.log(`UserTestList invoked with username ${this.username}.`);
        if (this.username) {
            this.quizServices.getUserTests(this.username)
                .subscribe(userTests => this.userTests = userTests);
        }
    }

    reviewTest(testId:number) {
        console.log(`Selected test ${testId}.`);
        this.selectedTest.next(testId);
    }
}