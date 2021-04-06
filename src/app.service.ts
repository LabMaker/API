import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
export class TypeTest {
  ids: [string];
  constructor(ids2) {
    this.ids = ids2;
  }
}

export class LogDto {
  user: string;
  message: string;
  subreddit: string;
  id: string;
  time: string;
  constructor(data) {
    this.user = data.user;
    this.message = data.message;
    this.subreddit = data.subreddit;
    this.id = data.id;
    this.time = data.time;
  }
}

export class LogsDto {
  logs: [LogDto];
  constructor(data) {
    this.logs = data;
  }
}

@Injectable()
export class AppService {
  async checkFileExists(file: string) {
    require('fs').exists(file, (exists) => {
      if (exists) {
        console.log('Exists');
        return true;
      } else {
        console.log('Not Valid');
        return;
      }
    });
  }

  getSubmissions(): TypeTest {
    let path = 'src/utils/submissionIds.json';
    this.checkFileExists(path);
    var json = JSON.parse(require('fs').readFileSync(path, 'utf8'));
    return json;
  }

  @HttpCode(204)
  insertId(body) {
    let currentSubs = this.getSubmissions();
    currentSubs.ids.push(body.id);
    require('fs').writeFileSync(
      'src/utils/submissionIds.json',
      JSON.stringify(currentSubs, null, 1),
    );
    return HttpStatus.ACCEPTED;
  }

  getLogs(): LogsDto {
    let path = 'src/utils/logs.json';
    var json = JSON.parse(require('fs').readFileSync(path, 'utf8'));
    console.log(json);
    return json;
  }

  @HttpCode(204)
  insertLog(body) {
    let currentLogs = this.getLogs();
    let path = 'src/utils/logs.json';
    currentLogs.logs.push(body);
    console.log(currentLogs);
    require('fs').writeFileSync(path, JSON.stringify(currentLogs, null, 1));
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
