export class StripeCustomer {
  id = '';
  account_balance: number=0;
  created = '';
  default_source = '';
  description = '';
  email = '';
  sources: Sources = new Sources()
  subscriptions: Subscription = new Subscription()
}

export class Sources {
  data: DataSource[] = []
}

export class DataSource {
  id = '';
  object = 'card';
  address_city = '';
  address_country = '';
  address_line1 = '';
  address_state = '';
  address_zip = '';
  address_line2 = '';
  brand = '';
  number = '';
  country = '';
  exp_month = '';
  exp_year = '';
  last4 = '';
  funding = '';
  cvc = '';
}

export class Subscription {
  data:DataSubscription[]=[]
}

export class DataSubscription {
  id = '';
  created = '';
  current_period_end = '';
  current_period_start = '';
  items :Items = new Items()
  plan: Plan = new Plan()
}


export class Items {
  data:DataItem[]=[]
}

export class DataItem {
  id = '';
  created = '';
  plan: Plan = new Plan()
}

export class Plan {
  id = '';
  amount = 0;
  created = '';
  currency = '';
  interval = '';
  interval_count = 0;
}
