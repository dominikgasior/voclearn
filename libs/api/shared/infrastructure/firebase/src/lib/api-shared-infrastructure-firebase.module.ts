import { Module } from '@nestjs/common';
import { FirebaseAdmin } from './firebase-admin';
import { FirebaseApi } from './firebase-api';
import { HttpModule } from '@nestjs/axios';
import { FirebaseConfigService } from './config/firebase-config.service';
import { ConfigModule } from '@nestjs/config';
import firebaseConfig from './config/firebase.config';

@Module({
  imports: [ConfigModule.forFeature(firebaseConfig), HttpModule],
  providers: [FirebaseConfigService, FirebaseAdmin, FirebaseApi],
  exports: [FirebaseAdmin, FirebaseApi],
})
export class ApiSharedInfrastructureFirebaseModule {}
