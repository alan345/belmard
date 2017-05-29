

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'companieFilter'
})

export class CompanieFilterPipe implements PipeTransform {
    transform(items: any[], search: string, orderBy: string ): any {
      //  console.log(items)
        let orderByDirection = '+'
        if(orderBy.charAt(0) === '-') {
          orderBy = orderBy.slice( 1 )
          orderByDirection = '-'
        }

        let returnItems: any[] = []
        items.forEach((item) => {
          let str1 = item.profile.name.toLowerCase()
          let str2 = search.toLowerCase()
          if(str1.includes(str2))
            returnItems.push(item)
        })

        var map = returnItems.map(function(e, i) {
          let returnObj = { index: i, value: e.profile.name.toLowerCase() };
          if(orderBy === 'client')
            returnObj = { index: i, value: e.profile.name.toLowerCase() };
          if(orderBy === 'stylist') {
            if(e.profile.parentUser[0]) {
              //console.log(e.profile.parentUser[0].profile.name.toLowerCase(), 'alan')
              returnObj = { index: i, value: e.profile.parentUser[0].profile.name.toLowerCase() };
            }
          }
          if(orderBy === 'lastVisit') {
            if(e.lastVisit)
              returnObj = { index: i, value: e.lastVisit };
          }
          return returnObj
        })

        // on trie l'objet temporaire avec les valeurs réduites
        if(orderByDirection === '-')
          map.sort(function(a, b) {
            return -(a.value > b.value) || -(a.value === b.value) + 1;
          });
        if(orderByDirection === '+')
          map.sort(function(a, b) {
            return +(a.value > b.value) || +(a.value === b.value) - 1;
          });
        // on utilise un objet final pour les résultats
        var result = map.map(function(e){
          return returnItems[e.index];
        });
        return result
    }
}
