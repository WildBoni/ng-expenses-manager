import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';

import { Expense } from './expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {}

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

}
