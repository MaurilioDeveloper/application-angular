"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var notifications_component_1 = require("./notifications/notifications.component");
var email_renault_component_1 = require("./forget_password/email-renault.component");
var email_nissan_component_1 = require("./forget_password/email-nissan.component");
var change_password_component_1 = require("./change_password/change_password.component");
var notice_component_1 = require("./home/notice/notice.component");
var notice_list_component_1 = require("./home/notice/notice-list.component");
var model_component_1 = require("./model/model.component");
var news_admin_component_1 = require("./admin/news/news_admin.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component"); //import home components
var not_found_component_1 = require("./not-found.component");
var can_deactivate_guard_service_1 = require("./can-deactivate-guard.service");
var auth_guard_service_1 = require("./login/auth-guard.service");
var submissao_component_1 = require("./submissao/submissao.component");
var commission_level_component_1 = require("./commission_level/commission_level.component");
var mandatory_component_1 = require("./services/mandatory/mandatory.component");
var available_component_1 = require("./services/available/available.component");
var my_agreement_component_1 = require("./my_agreement/my_agreement.component");
var my_profile_dialog_1 = require("./menu/profile/my_profile.dialog");
var reset_password_component_1 = require("./reset_password/reset_password.component");
var simulation_component_1 = require("./simulation/simulation.component");
var promotional_images_component_1 = require("./promotional_images/promotional_images.component");
var proposal_update_component_1 = require("./proposal_update/proposal_update.component");
var dealer_proposal_component_1 = require("./dealer_proposal/dealer_proposal.component");
var dealer_proposal_detail_component_1 = require("./dealer_proposal/detail/dealer_proposal_detail.component");
var appRoutes = [
    {
        path: 'simulation',
        component: simulation_component_1.SimulationComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'simulation/:id',
        component: simulation_component_1.SimulationComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'model',
        component: model_component_1.ModelComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'dealer_proposal',
        component: dealer_proposal_component_1.DealerProposalComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'dealer_proposal_detail/:id',
        component: dealer_proposal_detail_component_1.DealerProposalDetailComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'proposal_update',
        component: proposal_update_component_1.ProposalUpdateComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'promotional_images',
        component: promotional_images_component_1.PromotionalImagesComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'news_admin',
        component: news_admin_component_1.NewsAdminComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'reset_password/:idUser/:token',
        component: reset_password_component_1.ResetPasswordComponent
    },
    {
        path: 'reset_password/:token/:idUser/nissan/ns',
        component: email_nissan_component_1.EmailNissanComponent
    },
    {
        path: 'reset_password/:token/:idUser/renault/rs',
        component: email_renault_component_1.EmailRenaultComponent
    },
    {
        path: 'change_password',
        component: change_password_component_1.ChangePasswordComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'available',
        component: available_component_1.AvailableComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'notification',
        component: notifications_component_1.NotificationComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'submissao',
        component: submissao_component_1.SubmissaoComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'commission_level',
        component: commission_level_component_1.CommissionLevelComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'mandatory',
        component: mandatory_component_1.MandatoryComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'home',
        component: home_component_1.HomeComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'my_agreement',
        component: my_agreement_component_1.MyAgreementComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'profile',
        component: my_profile_dialog_1.MyProfileComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'notice/:id',
        component: notice_component_1.NoticeComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    { path: '**', component: not_found_component_1.PageNotFoundComponent }
];
/**TODO Verificar como construir a rota sem '#' */
exports.AppRoutes = {
    //  routes: RouterModule.forRoot(appRoutes),
    components: [
        home_component_1.HomeComponent,
        news_admin_component_1.NewsAdminComponent,
        available_component_1.AvailableComponent,
        commission_level_component_1.CommissionLevelComponent,
        my_agreement_component_1.MyAgreementComponent,
        my_profile_dialog_1.MyProfileComponent,
        mandatory_component_1.MandatoryComponent,
        simulation_component_1.SimulationComponent,
        not_found_component_1.PageNotFoundComponent,
        reset_password_component_1.ResetPasswordComponent,
        submissao_component_1.SubmissaoComponent,
        promotional_images_component_1.PromotionalImagesComponent,
        model_component_1.ModelComponent,
        proposal_update_component_1.ProposalUpdateComponent,
        dealer_proposal_component_1.DealerProposalComponent,
        dealer_proposal_detail_component_1.DealerProposalDetailComponent,
        notice_list_component_1.NoticeListComponent,
        notice_component_1.NoticeComponent,
        change_password_component_1.ChangePasswordComponent,
        email_nissan_component_1.EmailNissanComponent,
        email_renault_component_1.EmailRenaultComponent,
        notifications_component_1.NotificationComponent
    ]
};
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(appRoutes)
            ],
            exports: [
                router_1.RouterModule
            ],
            providers: [
                can_deactivate_guard_service_1.CanDeactivateGuard,
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.js.map