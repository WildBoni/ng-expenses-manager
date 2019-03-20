import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { UIService } from '../../shared/ui.service';
import * as fromRoot from '../../app.reducer';
import * as fromGroup from '../groups.reducer';

import { Group } from '../group.model';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  groups: Group[] = [];
  isLoading$: Observable<boolean>;
  groups$:  Observable<Group[]>;

  constructor(
    private groupsService: GroupsService,
    private uiService: UIService,
    private store: Store<fromGroup.State>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.groupsService.fetchGroups();
    this.groups$ = this.store.select(fromGroup.getGroups);
  }

  onDelete(group) {
    this.groupsService.deleteGroup(group);
  }
}
