import { NgtCoreModule, NgtRepeatModule } from "@angular-three/core";
import { NgtIcosahedronGeometryModule } from "@angular-three/core/geometries";
import {
  NgtDirectionalLightModule,
  NgtPointLightModule,
} from "@angular-three/core/lights";
import { NgtLodModule } from "@angular-three/core/lod";
import {
  NgtMeshBasicMaterialModule,
  NgtMeshLambertMaterialModule,
} from "@angular-three/core/materials";
import { NgtMeshModule } from "@angular-three/core/meshes";
import { NgtStatsModule } from "@angular-three/core/stats";
import {
  NgtSobaFlyControlsModule,
  NgtSobaOrbitControlsModule,
} from "@angular-three/soba/controls";
import { NgtSobaDetailedModule } from "@angular-three/soba/performances";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent, LODComponent } from "./app.component";
import { RxFor } from "./rx-for.directive";

@NgModule({
  declarations: [AppComponent, RxFor, LODComponent],
  imports: [
    BrowserModule,
    NgtCoreModule,
    NgtSobaDetailedModule,
    NgtMeshBasicMaterialModule,
    NgtSobaOrbitControlsModule,
    NgtPointLightModule,
    NgtDirectionalLightModule,
    NgtStatsModule,
    NgtMeshLambertMaterialModule,
    NgtSobaFlyControlsModule,
    NgtIcosahedronGeometryModule,
    NgtMeshModule,
    NgtRepeatModule,
    NgtLodModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
