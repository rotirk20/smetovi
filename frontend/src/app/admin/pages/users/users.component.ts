import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'email', label: 'Email' },
    { key: 'username', label: 'Korisničko ime' },
    { key: 'actions', label: 'Akcije' }
  ];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        console.log(users);
      },
      error: err => console.error('Observable emitted an error: ' + err),
      complete: () => console.log('Observable emitted the complete notification')
    });
  }
}
