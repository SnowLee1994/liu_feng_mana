import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {RoleService} from './role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  error = '';
  pageNum = 1;
  pageSize = 5;
  collectionSize;

  submitted: boolean;

  customersData: [];
  addform: FormGroup;
  editform: FormGroup;

  constructor(private modalService: NgbModal,
              public formBuilder: FormBuilder,
              private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{label: '基础资源'}, {label: '角色管理', active: true}];

    this.addform = this.formBuilder.group({
      name: ['', [Validators.required]],
      memo: ['', []],
    });

    this.editform = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      memo: ['', []],
    });

    this._fetchData(this.pageNum, this.pageSize);
  }

  /**
   * 获取角色列表
   * @private
   */
  private _fetchData(pageNum: number, pageSize: number) {
    let sendData = {'pageNum': pageNum, 'pageSize': pageSize};
    this.roleService.findRolesByPage(sendData).subscribe(res => {
        console.log(res);
        if (res.success) {
          this.customersData = res.data.list;
          this.collectionSize = res.data.total;
        } else {
          alert('获取角色列表失败:' + res.msg);
        }
      },
      error => {
        this.error = error ? error : '';
      });
  }

  /**
   * 刷新数据
   * @param pageNum
   */
  refresh(pageNum: number) {
    this._fetchData(pageNum, this.pageSize);
  }

  get form() {
    return this.addform.controls;
  }

  get editForm() {
    return this.editform.controls;
  }

  /**
   * 打开新增模态框
   * @param content
   */
  openAddModal(content: any) {
    this.modalService.open(content, {centered: true});
  }

  /**
   * 打开编辑模态框
   * @param content
   * @param editId
   */
  openEditModal(content: any, editId: string) {
    //根据ID查询用户信息
    let sendData = {'id': editId};
    this.roleService.findRoleById(sendData).subscribe(r => {
        if (r.success) {
          this.modalService.open(content, {centered: true});
          this.editform.patchValue(r.data);
        } else {
          alert('添加失败！');
        }
      },
      error => {
        this.error = error ? error : '';
      });
  }

  /**
   * 保存角色
   */
  saveData() {
    if (this.addform.valid) {
      this.roleService.addRole(this.addform.value).subscribe(r => {
          if (r.success) {
            this.addform.reset();
            this.modalService.dismissAll();
            this._fetchData(this.pageNum, this.pageSize);
          } else {
            alert('添加失败！');
          }
        },
        error => {
          this.error = error ? error : '';
        });
    }
    this.submitted = true;
  }

  /**
   * 更新用户
   */
  saveUpdate() {
    if (this.editform.valid) {
      this.roleService.updateRole(this.editform.value).subscribe(r => {
          if (r.success) {
            this.modalService.dismissAll();
            this._fetchData(this.pageNum, this.pageSize);
          } else {
            alert('添加失败！');
          }
        },
        error => {
          this.error = error ? error : '';
        });
    }
  }

  /**
   * 是否删除用户
   * @param deleteId
   */
  cancel(deleteId: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-2'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons
      .fire({
        title: '确认删除?',
        text: '删除后可能无法撤回!',
        icon: 'warning',
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        showCancelButton: true
      })
      .then(result => {
        if (result.value) {
          //删除
          let sendData = {'id': deleteId};
          this.roleService.deleteRole(sendData).subscribe(r => {
              console.log(r);
              if (r.success) {
                swalWithBootstrapButtons.fire(
                  '删除成功!',
                  '当前记录已删除.',
                  'success'
                );
                this._fetchData(this.pageNum, this.pageSize);
              } else {
                swalWithBootstrapButtons.fire(
                  '失败！',
                  '当前记录删除失败 :)',
                  'error'
                );
              }
            },
            error => {
              this.error = error ? error : '';
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            '取消',
            '记录保持完整 :)',
            'error'
          );
        }
      });
  }
}
