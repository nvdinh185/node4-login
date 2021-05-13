import { Inject, Injectable } from '@angular/core';

import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})

export class ApiStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  /**
   * Lưu xuống đĩa một khóa và một giá trị
   * @param key // Từ khóa để lưu trữ
   * @param value // giá trị ghi lại dạng string
   */
  save(key, value) {
    this.storage.set(key, value);
  }

  /**
   * Đọc giá trị từ đĩa lên bằng khóa
   * @param key 
   */
  read(key) {
    return this.storage.get(key);
  }

  /**
   * Xóa dữ liệu dưới đĩa
   * @param key 
   */
  delete(key) {
    this.storage.remove(key);
  }

}