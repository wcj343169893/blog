<?php
/**
 * Scaffold Index
 *
 * PHP 5
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the below copyright notice.
 *
 * @author     Yusuf Abdulla Shunan <shunan@maldicore.com>
 * @copyright  Copyright 2012, Maldicore Group Pvt Ltd. (http://maldicore.com)
 * @license    MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @since      CakePHP(tm) v 2.1.1
 */
?>
<div class="row-fluid">
    <div class="span12"><?php $pluralHumanName="文章";?>
        <div>
            <p class="nav-header"><?php echo __d('cake', 'Actions'); ?></p>
            <ul class="nav nav-tabs">
                <li><?php echo $this->Html->link(__d('cake', '新增%s', "文章"), array('plugin' => 'admin', 'action' => 'add')); ?></li>
                <li><?php echo $this->Html->link(__d('cake', '所有%s', "文章"), array('plugin' => 'admin', 'controller' => "articles", 'action' => 'index')); ?></li>
            </ul>
        </div>
    </div>
</div>
<div class="row-fluid">
    <div class="span12">
        <?php echo $this->Session->flash(); ?>
        <div class="page-header">
            <h1><?php echo str_replace('Admin ', '', $pluralHumanName); ?></h1>
        </div>
        <table class="table table-bordered table-striped">
        <!-- <table class="datagrid"> -->
            <thead>
                <tr>
                    <th><?php echo $this->Paginator->sort("oId","标题"); ?></th>
                    <th><?php echo $this->Paginator->sort("articleViewCount","浏览次数"); ?></th>
                    <th><?php echo $this->Paginator->sort("articleTypeId","分类"); ?></th>
                    <th><?php echo $this->Paginator->sort("articleIsPublished","是否发布"); ?></th>
                    <th><?php echo $this->Paginator->sort("articleCreateDate","发布时间"); ?></th>
                    <th colspan="3"><?php echo __d('cake', 'Actions'); ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($data as $article): ?><?php $arti=$article["Article"]?>
                    <tr>
                        <td><?php echo $this->Html->link($arti["articleTitle"], array('plugin' => 'admin', 'action' => 'view',$arti["oId"] )); ?></td>
                        <td><?php echo $arti["articleViewCount"]?></td>
                        <td><?php echo $article["ArticleType"]["name"]?></td>
                        <td><?php echo !empty($arti["articleIsPublished"])?"是":"否"?></td>
                        <td><?php echo $arti["articleCreateDate"]?></td>
                        <td><?php echo $this->Html->link(__d('cake', 'View'), array('plugin' => 'admin', 'action' => 'view', $arti["oId"]), array('class' => 'btn btn-info')); ?></td>
                        <td><?php echo $this->Html->link(__d('cake', 'Edit'), array('plugin' => 'admin', 'action' => 'edit', $arti["oId"]), array('class' => 'btn btn-warning')); ?></td>
                        <td><?php echo $this->BSForm->postLink(__d('cake', 'Delete'), array('plugin' => 'admin', 'action' => 'delete',$arti["oId"] ), array('class' => 'btn btn-danger'), __d('cake', 'Are you sure you want to delete %s %s?', "article", $arti["oId"])); ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <div class="well">
            <?php echo $this->Paginator->counter(array('format' => __d('cake', 'Page {:page} of {:pages}, showing {:current} records out of {:count} total, starting on record {:start}, ending on {:end}'))); ?>
        </div>
        <?php if ($this->Paginator->numbers()): ?>
            <div class="pagination">
                <ul>
                    <?php echo $this->Paginator->first(); ?>
                    <?php echo $this->Paginator->prev(); ?>
                    <?php echo $this->Paginator->numbers(); ?>
                    <?php echo $this->Paginator->next(); ?>
                    <?php echo $this->Paginator->last(); ?>
                </ul>
            </div>
        <?php endif; ?>
    </div>
</div>
