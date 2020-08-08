import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";

import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { WifiComponent } from "../../pages/wifi/wifi.component";
 import { RtlComponent } from "../../pages/rtl/rtl.component";
import { CongtacvienComponent } from 'src/app/pages/congtacvien/congtacvien.component';
import { ChuatracocComponent } from 'src/app/pages/chuatracoc/chuatracoc.component';
import { WifidoicaplaisimComponent } from 'src/app/pages/wifidoicaplaisim/wifidoicaplaisim.component';

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "icons", component: IconsComponent },

  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  { path: "wifi", component: WifiComponent },
   { path: "rtl", component: RtlComponent },
   { path: "chuatracoc", component: ChuatracocComponent },
   { path: "congtacvien", component: CongtacvienComponent },
   { path: "wifidoicaplaisim", component: WifidoicaplaisimComponent }
];
