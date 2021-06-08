import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Observable } from 'rxjs';
import { Countries } from '../../constants/countries'
import { SkillService } from '../services/skill.service'
import { skill } from '../../interfaces/skill.interface'
import { PersonService } from '../services/person.service';


@Component({
  selector: 'person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person!: FormGroup

  choosenSkills: Array<Number> = []

  countries = Countries;

  skills!: Observable<skill[]>;
  skillsAsync!: Observable<skill[]>

  skillsData: Array<any> = []


  constructor(private skillService: SkillService, private personService: PersonService) { }

  ngOnInit(): void {
    this.person = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl('', Validators.required),
      yearsOfExperience: new FormControl('', [Validators.required, Validators.min(1), Validators.max(150)]),
      gender: new FormControl('Male'),
      country: new FormControl('Pakistan'),
      skills: new FormArray([])
    })

    this.skillService.get().subscribe(skills => {
      skills.forEach((skill) => {
        this.skillsArray.push(new FormControl(false))
        this.skillsData.push(skill);
      });
    })


  }

  get name() { return this.person.get('name'); }
  get emailAddress() { return this.person.get('emailAddress') }
  get dateOfBirth() { return this.person.get('dateOfBirth') }
  get yearsOfExperience() { return this.person.get('yearsOfExperience') }
  get gender() { return this.person.get('gender') }
  get skillsArray() { return this.person.get('skills') as FormArray }
  onSubmit() {
    delete this.person.value.skills;
    this.person.value.choosenSkills = this.choosenSkills;
    // console.log(this.person.value)
    this.personService.savePerson(this.person.value)
  }

  addCheckBoxes() {
    //this.skillsData.forEach(() => this.skillsArray.push(new FormControl(false)));
    this.skills && this.skills.forEach(() => this.skillsArray.push(new FormControl(false)));
  }
  handleChange(id: Number, event: any) {
    //console.log(event.target.checked);

    //console.log({ name, newStatus: event.target.checked })
    if (event.target.checked) {
      this.choosenSkills.push(id)
    } else {
      this.choosenSkills = this.choosenSkills.filter(x => x != id)
    }
  }

}
