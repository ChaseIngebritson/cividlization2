import { Component, inject } from '@angular/core';
import { DataService } from '../../core/services/data.service';

interface PolicyView {
  id: string;
  name: string;
  groups: string[];
  descriptionPlain: string;
  owned: boolean;
  unlocked: boolean;
}

@Component({
  selector: 'app-policies',
  standalone: true,
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss',
})
export class PoliciesComponent {
  private readonly data = inject(DataService);

  readonly policyCost = this.data.cultureCost?.() ?? 0;

  readonly groups = Object.values(this.data.conf.policies.groups).map((g: any) => ({
    id: g.id,
    name: g.name,
    description: g.description,
  }));

  private readonly allPolicies: PolicyView[] = Object.values(
    this.data.conf.policies.policies,
  ).map((p: any) => ({
    id: p.id,
    name: p.name,
    groups: p.groups ?? [],
    descriptionPlain: String(p.description ?? '').replace(/<[^>]+>/g, ' '),
    owned: false,
    unlocked: true,
  }));

  policiesFor(groupId: string): PolicyView[] {
    return this.allPolicies.filter(
      (p) => p.groups.length === 1 && p.groups[0] === groupId,
    );
  }

  get mixedPolicies(): PolicyView[] {
    return this.allPolicies.filter((p) => p.groups.length > 1);
  }
}
