import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
export class TypeTest {
  ids: [string];
  constructor(ids2) {
    this.ids = ids2;
  }
}

@Injectable()
export class AppService {
  getSubmissions(): TypeTest {
    var json = JSON.parse(
      require('fs').readFileSync('src/utils/submissionIds.json', 'utf8'),
    );
    return json;
  }

  @HttpCode(204)
  insertId(body) {
    let currentSubs = this.getSubmissions();
    currentSubs.ids.push(body.id);
    console.log(body.id);
    require('fs').writeFileSync(
      'src/utils/submissionIds.json',
      JSON.stringify(currentSubs, null, 1),
    );
    return HttpStatus.ACCEPTED;
  }

  getConfig() {
    var json = JSON.parse(
      require('fs').readFileSync('src/utils/config.json', 'utf8'),
    );
    return json;
  }

  updateConfig(body) {
    require('fs').writeFileSync(
      'src/utils/config.json',
      JSON.stringify(body, null, 1),
    );
    return HttpStatus.ACCEPTED;
  }
}
