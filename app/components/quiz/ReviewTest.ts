import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/common';
import {QuizServices} from '../../services/QuizServices';
import {RouteConfig, ROUTER_DIRECTIVES, RouteParams} from 'angular2/router';
import {IQuiz, ITest} from '../../../common/interfaces/QuizInterfaces';
import {TestScoreSummary} from './TestScoreSummary';
import {TestScoreDetail} from './TestScoreDetail';
import {EmptyQuestionReview} from './EmptyQuestionReview';
import {ReviewQuestion} from './ReviewQuestion';
import {Quiz} from '../../models/Quiz';
import {Test} from '../../models/Test';

@RouteConfig([
  { path: '/', component: EmptyQuestionReview, as: 'EmptyQuestionReview', useAsDefault: true },
  { path: '/quiz/:quizId/question/:questionId', component: ReviewQuestion, as: 'ReviewQuestion' }
])

@Component({
    selector: 'review-test',
    templateUrl: './components/quiz/ReviewTest.html',
    styleUrls: ['./components/quiz/ReviewTest.css'],

    providers: [QuizServices],
    directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, ROUTER_DIRECTIVES, TestScoreSummary, TestScoreDetail]
})
export class ReviewTest {

    quiz:IQuiz = new Quiz();
    test:ITest = new Test();

    constructor(public quizServices:QuizServices,
                public routeParams:RouteParams) {

    }

    ngOnInit() {
        this.readTest();
    }

    readTest() {
        let testId = parseInt(this.routeParams.get('testId'));

        this.quizServices.getTest(testId)
            .mergeMap(test => {
                this.test = test;
                return this.quizServices.getQuiz(test.quizId);
            })
            .subscribe((quiz:IQuiz) => this.quiz = quiz);
    }

}
